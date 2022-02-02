import React from "react";
import { createPopper } from "@popperjs/core";
import { useTranslation } from 'react-i18next';

const NotificationDropdown = ({ infoClick, editClick, deleteClick, enableClick, disableClick}) => {
  const {i18n} = useTranslation();
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-blueGray-500 py-1 px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i> 
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        
        <button onClick={infoClick} className="block w-full text-lightBlue-300 text-left background-transparent font-bold whitespace-nowrap uppercase px-4 py-2 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
          <i className="fas fa-info-circle"></i> {i18n.t('admin.details')}
        </button>
        {/* <button onClick={enableClick} className="block w-full text-emerald-500  text-left background-transparent font-bold uppercase px-4 py-2 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
          <i className="fas fa-toggle-on"></i> {i18n.t('admin.enable')}
        </button>
        <button onClick={disableClick} className="block w-full text-red-900  text-left background-transparent font-bold uppercase px-4 py-2 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
          <i className="fas fa-toggle-off"></i> {i18n.t('admin.disable')}
        </button> */}
        <button onClick={editClick} className="block w-full text-lightBlue-600  text-left background-transparent font-bold uppercase px-4 py-2 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
          <i className="fas fa-edit"></i> {i18n.t('admin.update')}
        </button>
        <button onClick={deleteClick} className="block w-full text-red-500  text-left background-transparent font-bold uppercase px-4 py-2 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
          <i className="fas fa-trash"></i> {i18n.t('admin.delete')}
        </button>
      </div>
    </>
  );
};

export default NotificationDropdown;
