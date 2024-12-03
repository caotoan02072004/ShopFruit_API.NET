import AdminMasterLayout from "../components/admin/layouts/AdminMasterLayout";
import AddBlog from "../components/admin/pages/blog/add/AddBlog";
import ListBlog from "../components/admin/pages/blog/list/ListBlog";
import UpdateBlog from "../components/admin/pages/blog/update/UpdateBlog";
import AddCategory from "../components/admin/pages/category/add/AddCategory";
import ListCategory from "../components/admin/pages/category/list/ListCategory";
import UpdateCategory from "../components/admin/pages/category/update/UpdateCategory";
import AddProduct from "../components/admin/pages/product/add/AddProduct";
import ListProduct from "../components/admin/pages/product/list/ListProduct";
import UpdateProduct from "../components/admin/pages/product/update/UpdateProduct";
import AddSupplier from "../components/admin/pages/supplier/add/AddSupplier";
import ListSupplier from "../components/admin/pages/supplier/list/ListSupplier";
import UpdateSupplier from "../components/admin/pages/supplier/update/UpdateSupplier";
import ListBanner from "../components/admin/pages/banner/list/ListBanner";
import UserMasterLayout from "../components/user/layouts/UserMasterLayout";
import Detail from "../components/user/pages/detail/Detail";
import Home from "../components/user/pages/home/Home";
import Shop from "../components/user/pages/shop/Shop";
import AddBanner from "../components/admin/pages/banner/add/AddBanner";
import UpdateBanner from "../components/admin/pages/banner/update/UpdateBanner";
import Contact from "../components/user/pages/contact/Contact";
import Blog from "../components/user/pages/blog/Blog";
import DetailProduct from "../components/admin/pages/product/detail/DetailProduct";
import ListAccount from "../components/admin/pages/account/list/ListAccount";
import AddAccount from "../components/admin/pages/account/add/AddAccount";
import ListCart from "../components/user/pages/cart/list/ListCart";
import ListOrder from "../components/admin/pages/order/list/ListOrder";
import ListOrderDetail from "../components/admin/pages/order/list/ListOrderDetail";
import UpdateOrder from "../components/admin/pages/order/update/UpdateOrder";
import UpdateAccount from "../components/admin/pages/account/update/UpdateAccount";

export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminMasterLayout child={<ListAccount />} />,
  },
  {
    path:"/admin/account/add",
    element: <AdminMasterLayout child={<AddAccount />} />
  },
  {
    path:"/admin/account/update/:id",
    element: <AdminMasterLayout child={<UpdateAccount />} />
  },


  {
    path: "admin/category",
    element: <AdminMasterLayout child={<ListCategory />} />,
  },
  {
    path: "admin/category/add",
    element: <AdminMasterLayout child={<AddCategory />} />,
  },
  {
    path: "admin/category/update/:id",
    element: <AdminMasterLayout child={<UpdateCategory />} />,
  },
  {
    path: "admin/product",
    element: <AdminMasterLayout child={<ListProduct />} />,
  },
  {
    path: "admin/product/add",
    element: <AdminMasterLayout child={<AddProduct />} />,
  },
  {
    path: "admin/product/update/:id",
    element: <AdminMasterLayout child={<UpdateProduct />} />,
  },
  {
    path: "admin/product/detail/:id",
    element: <AdminMasterLayout child={<DetailProduct />} />,
  },

  {
    path: "admin/supplier",
    element: <AdminMasterLayout child={<ListSupplier />} />,
  },
  {
    path: "admin/supplier/add",
    element: <AdminMasterLayout child={<AddSupplier />} />,
  },
  {
    path: "admin/supplier/update/:id",
    element: <AdminMasterLayout child={<UpdateSupplier />} />,
  },

  {
    path:"admin/banner",
    element:<AdminMasterLayout child={<ListBanner/>}/>
  },
  {
    path:"admin/banner/add",
    element:<AdminMasterLayout child={<AddBanner/>}/>
  },
  {
    path:"admin/banner/update/:id",
    element:<AdminMasterLayout child={<UpdateBanner/>}/>
  },

  {
    path:"admin/blog",
    element:<AdminMasterLayout child={<ListBlog/>} />
  },
  {
    path:"admin/blog/add",
    element:<AdminMasterLayout child={<AddBlog/>} />
  },
  {
    path:"/admin/blog/update/:id",
    element:<AdminMasterLayout child={<UpdateBlog/>} />
  },
  {
    path:"/admin/order",
    element:<AdminMasterLayout child={<ListOrder />} />
  },
  {
    path:"/admin/order/detail/:id",
    element:<AdminMasterLayout child={<ListOrderDetail />} />
  },
  {
    path:"/admin/order/update/:id",
    element:<AdminMasterLayout child={<UpdateOrder />} />
  }
];

export const clientRoutes = [
  {
    path: "",
    element: <UserMasterLayout child={<Home />} />,
  },
  {
    path: "/",
    element: <UserMasterLayout child={<Home />} />,
  },
  {
    path: "/shop",
    element: <UserMasterLayout child={<Shop />} />,
  },
  {
    path: "/contact",
    element:<UserMasterLayout child={<Contact />} />,
  },
  {
    path:"/blog",
    element:<UserMasterLayout child={<Blog />} />
  },
  {
    path: "/detail/:id",
    element: <UserMasterLayout child={<Detail />} />,
  },
  {
    path:"/cart",
    element:<UserMasterLayout child={<ListCart />} />,
  }
];
