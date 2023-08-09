<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 7/30/2019
 * Time: 1:56 PM
 */
namespace Modules\Car\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\AdminController;
use Modules\Car\Models\Car;
use Modules\Car\Models\CarTerm;
use Modules\Car\Models\CarTranslation;
use Modules\Core\Events\CreatedServicesEvent;
use Modules\Core\Events\UpdatedServiceEvent;
use Modules\Core\Models\Attributes;
use Modules\Location\Models\Location;

class CarController extends AdminController
{
    protected $car;
    protected $car_translation;
    protected $car_term;
    protected $attributes;
    protected $location;

    public function __construct()
    {
        parent::__construct();
        $this->setActiveMenu(route('car.admin.index'));
        $this->car = Car::class;
        $this->car_translation = CarTranslation::class;
        $this->car_term = CarTerm::class;
        $this->attributes = Attributes::class;
        $this->location = Location::class;
    }

    public function callAction($method, $parameters)
    {
        if (!Car::isEnable()) {
            return redirect('/');
        }
        return parent::callAction($method, $parameters); // TODO: Change the autogenerated stub
    }

    public function index(Request $request)
    {
        $this->checkPermission('car_view');
        $query = $this->car::query();
        $query->orderBy('id', 'desc');
        if (!empty($s = $request->input('s'))) {
            $query->where('title', 'LIKE', '%' . $s . '%');
            $query->orderBy('title', 'asc');
        }
        if (!empty($is_featured = $request->input('is_featured'))) {
            $query->where('is_featured', 1);
        }
        if (!empty($location_id = $request->query('location_id'))) {
            $query->where('location_id', $location_id);
        }
        if ($this->hasPermission('car_manage_others')) {
            if (!empty($author = $request->input('vendor_id'))) {
                $query->where('create_user', $author);
            }
        } else {
            $query->where('create_user', Auth::id());
        }
        $data = [
            'rows'              => $query->with(['author'])->paginate(20),
            'car_manage_others' => $this->hasPermission('car_manage_others'),
            'breadcrumbs'       => [
                [
                    'name' => __('Cars'),
                    'url'  => route('car.admin.index')
                ],
                [
                    'name'  => __('All'),
                    'class' => 'active'
                ],
            ],
            'page_title'        => __("Car Management")
        ];
        return view('Car::admin.index', $data);
    }

    public function recovery(Request $request)
    {
        $this->checkPermission('car_view');
        $query = $this->car::onlyTrashed();
        $query->orderBy('id', 'desc');
        if (!empty($s = $request->input('s'))) {
            $query->where('title', 'LIKE', '%' . $s . '%');
            $query->orderBy('title', 'asc');
        }
        if ($this->hasPermission('car_manage_others')) {
            if (!empty($author = $request->input('vendor_id'))) {
                $query->where('create_user', $author);
            }
        } else {
            $query->where('create_user', Auth::id());
        }
        $data = [
            'rows'              => $query->with(['author'])->paginate(20),
            'car_manage_others' => $this->hasPermission('car_manage_others'),
            'recovery'          => 1,
            'breadcrumbs'       => [
                [
                    'name' => __('Cars'),
                    'url'  => route('car.admin.index')
                ],
                [
                    'name'  => __('Recovery'),
                    'class' => 'active'
                ],
            ],
            'page_title'        => __("Recovery Car Management")
        ];
        return view('Car::admin.index', $data);
    }

    public function create(Request $request)
    {
        $this->checkPermission('car_create');
        $row = new $this->car();
        $row->fill([
            'status' => 'publish'
        ]);
        $data = [
            'row'          => $row,
            'attributes'   => $this->attributes::where('service', 'car')->get(),
            'car_location' => $this->location::where('status', 'publish')->get()->toTree(),
            'translation'  => new $this->car_translation(),
            'breadcrumbs'  => [
                [
                    'name' => __('Cars'),
                    'url'  => route('car.admin.index')
                ],
                [
                    'name'  => __('Add Car'),
                    'class' => 'active'
                ],
            ],
            'page_title'   => __("Add new Car")
        ];
        return view('Car::admin.detail', $data);
    }

    public function edit(Request $request, $id)
    {
        $this->checkPermission('car_update');
        $row = $this->car::find($id);
        if (empty($row)) {
            return redirect(route('car.admin.index'));
        }
        $translation = $row->translateOrOrigin($request->query('lang'));
        if (!$this->hasPermission('car_manage_others')) {
            if ($row->create_user != Auth::id()) {
                return redirect(route('car.admin.index'));
            }
        }
        $data = [
            'row'               => $row,
            'translation'       => $translation,
            "selected_terms"    => $row->terms->pluck('term_id'),
            'attributes'        => $this->attributes::where('service', 'car')->get(),
            'car_location'      => $this->location::where('status', 'publish')->get()->toTree(),
            'enable_multi_lang' => true,
            'breadcrumbs'       => [
                [
                    'name' => __('Cars'),
                    'url'  => route('car.admin.index')
                ],
                [
                    'name'  => __('Edit Car'),
                    'class' => 'active'
                ],
            ],
            'page_title'        => __("Edit: :name", ['name' => $row->title])
        ];
        return view('Car::admin.detail', $data);
    }

    public function store(Request $request, $id)
    {

        if ($id > 0) {
            $this->checkPermission('car_update');
            $row = $this->car::find($id);
            if (empty($row)) {
                return redirect(route('car.admin.index'));
            }
            if ($row->create_user != Auth::id() and !$this->hasPermission('car_manage_others')) {
                return redirect(route('car.admin.index'));
            }
        } else {
            $this->checkPermission('car_create');
            $row = new $this->car();
            $row->status = "publish";
        }
        $dataKeys = [
            'title',
            'content',
            'price',
            'is_instant',
            'status',
            'video',
            'faqs',
            'image_id',
            'banner_image_id',
            'gallery',
            'location_id',
            'address',
            'map_lat',
            'map_lng',
            'map_zoom',
            'number',
            'price',
            'sale_price',
            'passenger',
            'gear',
            'baggage',
            'door',
            'enable_extra_price',
            'extra_price',
            'is_featured',
            'default_state',
            'enable_service_fee',
            'service_fee',
            'min_day_before_booking',
            'min_day_stays',
        ];
        if ($this->hasPermission('car_manage_others')) {
            $dataKeys[] = 'create_user';
        }
        $row->fillByAttr($dataKeys, $request->input());
        if ($request->input('slug')) {
            $row->slug = $request->input('slug');
        }
        $res = $row->saveOriginOrTranslation($request->input('lang'), true);
        if ($res) {
            if (!$request->input('lang') or is_default_lang($request->input('lang'))) {
                $this->saveTerms($row, $request);
            }
            if ($id > 0) {
                event(new UpdatedServiceEvent($row));
                return back()->with('success', __('Car updated'));
            } else {
                event(new CreatedServicesEvent($row));
                return redirect(route('car.admin.edit', $row->id))->with('success', __('Car created'));
            }
        }
    }

    public function saveTerms($row, $request)
    {
        $this->checkPermission('car_manage_attributes');
        if (empty($request->input('terms'))) {
            $this->car_term::where('target_id', $row->id)->delete();
        } else {
            $term_ids = $request->input('terms');
            foreach ($term_ids as $term_id) {
                $this->car_term::firstOrCreate([
                    'term_id'   => $term_id,
                    'target_id' => $row->id
                ]);
            }
            $this->car_term::where('target_id', $row->id)->whereNotIn('term_id', $term_ids)->delete();
        }
    }

    public function bulkEdit(Request $request)
    {

        $ids = $request->input('ids');
        $action = $request->input('action');
        if (empty($ids) or !is_array($ids)) {
            return redirect()->back()->with('error', __('No items selected!'));
        }
        if (empty($action)) {
            return redirect()->back()->with('error', __('Please select an action!'));
        }
        switch ($action) {
            case "delete":
                foreach ($ids as $id) {
                    $query = $this->car::where("id", $id);
                    if (!$this->hasPermission('car_manage_others')) {
                        $query->where("create_user", Auth::id());
                        $this->checkPermission('car_delete');
                    }
                    $row = $query->first();
                    if (!empty($row)) {
                        $row->delete();
                        event(new UpdatedServiceEvent($row));
                    }
                }
                return redirect()->back()->with('success', __('Deleted success!'));
                break;
            case "permanently_delete":
                foreach ($ids as $id) {
                    $query = $this->car::where("id", $id);
                    if (!$this->hasPermission('car_manage_others')) {
                        $query->where("create_user", Auth::id());
                        $this->checkPermission('car_delete');
                    }
                    $row = $query->withTrashed()->first();
                    if ($row) {
                        $row->forceDelete();
                    }
                }
                return redirect()->back()->with('success', __('Permanently delete success!'));
                break;
            case "recovery":
                foreach ($ids as $id) {
                    $query = $this->car::withTrashed()->where("id", $id);
                    if (!$this->hasPermission('car_manage_others')) {
                        $query->where("create_user", Auth::id());
                        $this->checkPermission('car_delete');
                    }
                    $row = $query->first();
                    if (!empty($row)) {
                        $row->restore();
                        event(new UpdatedServiceEvent($row));
                    }
                }
                return redirect()->back()->with('success', __('Recovery success!'));
                break;
            case "clone":
                $this->checkPermission('car_create');
                foreach ($ids as $id) {
                    (new $this->car())->saveCloneByID($id);
                }
                return redirect()->back()->with('success', __('Clone success!'));
                break;
            default:
                // Change status
                foreach ($ids as $id) {
                    $query = $this->car::where("id", $id);
                    if (!$this->hasPermission('car_manage_others')) {
                        $query->where("create_user", Auth::id());
                        $this->checkPermission('car_update');
                    }
                    $row = $query->first();
                    $row->status = $action;
                    $row->save();
                    event(new UpdatedServiceEvent($row));
                }
                return redirect()->back()->with('success', __('Update success!'));
                break;
        }
    }

    public function getForSelect2(Request $request)
    {
        $pre_selected = $request->query('pre_selected');
        $selected = $request->query('selected');
        if ($pre_selected && $selected) {
            if (is_array($selected)) {
                $items = $this->car::select('id', 'title as text')->whereIn('id', $selected)->take(50)->get();
                return $this->sendSuccess([
                    'items' => $items
                ]);
            } else {
                $item = $this->car::find($selected);
            }
            if (empty($item)) {
                return $this->sendSuccess([
                    'text' => ''
                ]);
            } else {
                return $this->sendSuccess([
                    'text' => $item->name
                ]);
            }
        }
        $q = $request->query('q');
        $query = $this->car::select('id', 'title as text')->where("status", "publish");
        if ($q) {
            $query->where('title', 'like', '%' . $q . '%');
        }
        $res = $query->orderBy('id', 'desc')->limit(20)->get();
        return $this->sendSuccess([
            'results' => $res
        ]);
    }
}