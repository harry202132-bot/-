import React from 'react';
import Login from './Login';
import MyAccountContent from './MyAccountContent';
import TicketManagementContent from './TicketManagementContent';
import AddVoucherContent from './AddVoucherContent';
import BasicSettingsContent from './BasicSettingsContent';
import SuccessModal from './SuccessModal';

// This registry maps string names to actual components and provides default props.
// This allows the AI to specify which component to render without needing to know
// about complex, non-serializable props like functions.

interface ComponentRegistration {
  component: React.ComponentType<any>;
  defaultProps: { [key: string]: any };
}

export const componentRegistry: { [key: string]: ComponentRegistration } = {
  Login: {
    component: Login,
    defaultProps: {
      onLoginSuccess: () => console.log('Login success (mock)'),
      onSwitchToRegister: () => console.log('Switch to register (mock)'),
    },
  },
  MyAccountContent: {
    component: MyAccountContent,
    defaultProps: {
      setCurrentPage: () => console.log('Set current page (mock)'),
    },
  },
  TicketManagementContent: {
    component: TicketManagementContent,
    defaultProps: {
      setCurrentPage: () => console.log('Set current page (mock)'),
    },
  },
  AddVoucherContent: {
    component: AddVoucherContent,
    defaultProps: {
      setCurrentPage: () => console.log('Set current page (mock)'),
      setIsVoucherCreationComplete: () => console.log('Set voucher creation complete (mock)'),
    },
  },
  BasicSettingsContent: {
    component: BasicSettingsContent,
    defaultProps: {
      setCurrentPage: () => console.log('Set current page (mock)'),
      setIsBasicSettingsComplete: () => console.log('Set basic settings complete (mock)'),
    },
  },
  SuccessModal: {
    component: SuccessModal,
    defaultProps: {},
  }
};
