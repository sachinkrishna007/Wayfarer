import React from 'react'
import { Menubar } from 'primereact/menubar'
import { InputText } from 'primereact/inputtext'
import { Link } from 'react-router-dom'

export default function TemplateDemo() {
  const menubarStyle = {
    backgroundColor: 'white', // Specify your desired background color here
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.auth)
  console.log(userInfo)
  const [logoutApiCall] = useLogoutMutation()
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  const items = [
    {
      label: 'Home',
      icon: 'pi-home',
      template: (item, options) => (
        <Link to="/register" className="p-menuitem-link">
          <i className="pi pi-home"></i>
          <span className="p-menuitem-text">Home</span>
        </Link>
      ),

      // items: [
      //   {
      //     label: "New",
      //     icon: "pi pi-fw pi-plus",
      //     items: [
      //       {
      //         label: "Bookmark",
      //         icon: "pi pi-fw pi-bookmark",
      //       },
      //       {
      //         label: "Video",
      //         icon: "pi pi-fw pi-video",
      //       },
      //     ],
      //   },
      //   {
      //     label: "Delete",
      //     icon: "pi pi-fw pi-trash",
      //   },
      //   {
      //     separator: true,
      //   },
      //   {
      //     label: "Export",
      //     icon: "pi pi-fw pi-external-link",
      //   },
      // ],
    },
    {
      label: 'Edit',
      icon: 'pi pi-fw pi-pencil',
      items: [
        {
          label: 'Left',
          icon: 'pi pi-fw pi-align-left',
        },
        {
          label: 'Right',
          icon: 'pi pi-fw pi-align-right',
        },
        {
          label: 'Center',
          icon: 'pi pi-fw pi-align-center',
        },
        {
          label: 'Justify',
          icon: 'pi pi-fw pi-align-justify',
        },
      ],
    },
    {
      label: 'Users',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-user-plus',
        },
        {
          label: 'Delete',
          icon: 'pi pi-fw pi-user-minus',
        },
        {
          label: 'Search',
          icon: 'pi pi-fw pi-users',
          items: [
            {
              label: 'Filter',
              icon: 'pi pi-fw pi-filter',
              items: [
                {
                  label: 'Print',
                  icon: 'pi pi-fw pi-print',
                },
              ],
            },
            {
              icon: 'pi pi-fw pi-bars',
              label: 'List',
            },
          ],
        },
      ],
    },
    {
      label: 'Events',
      icon: 'pi pi-fw pi-calendar',
      items: [
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
            {
              label: 'Save',
              icon: 'pi pi-fw pi-calendar-plus',
            },
            {
              label: 'Delete',
              icon: 'pi pi-fw pi-calendar-minus',
            },
          ],
        },
        {
          label: 'Archive',
          icon: 'pi pi-fw pi-calendar-times',
          items: [
            {
              label: 'Remove',
              icon: 'pi pi-fw pi-calendar-minus',
            },
          ],
        },
      ],
    },
    {
      label: 'Logout',
      icon: 'pi pi-fw pi-power-off',
      command: (event) => logoutHandler(event),
    },
  ]

  const start = (
    <img alt="logo" src="/wayfarerlogo.png" height="30" className="mr-2"></img>
  )
  const end = <InputText placeholder="Search" type="text" className="w-full" />

  return (
    <div className="card">
      <Menubar model={items} start={start} end={end} style={menubarStyle} />
    </div>
  )
}
