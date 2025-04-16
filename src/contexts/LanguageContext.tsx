import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Language = 'en' | 'es';

interface Translations {
  [key: string]: {
    en: string;
    es: string;
  };
}

const translations: Record<string, Record<Language, string>> = {
  'nav.home': {
    en: 'Home',
    es: 'Inicio'
  },
  'nav.form': {
    en: 'Form',
    es: 'Formulario'
  },
  'nav.clients': {
    en: 'Clients',
    es: 'Clientes'
  },
  'nav.analytics': {
    en: 'Analytics',
    es: 'Analítica'
  },
  'nav.logout': {
    en: 'Logout',
    es: 'Cerrar sesión'
  },
  'nav.menu': {
    en: 'Menu',
    es: 'Menú'
  },
  'nav.reportBug': {
    en: 'Report a Bug',
    es: 'Reportar un error'
  },
  'nav.suggestions': {
    en: 'Suggestions',
    es: 'Sugerencias'
  },
  'login.title': {
    en: 'Login',
    es: 'Iniciar sesión'
  },
  'login.username': {
    en: 'Username',
    es: 'Nombre de usuario'
  },
  'login.password': {
    en: 'Password',
    es: 'Contraseña'
  },
  'login.submit': {
    en: 'Submit',
    es: 'Enviar'
  },
  'login.error': {
    en: 'Invalid username or password',
    es: 'Nombre de usuario o contraseña inválidos'
  },
  'login.forgotPassword': {
    en: 'Forgot Password',
    es: 'Olvidé mi Contraseña'
  },
  'admin.users': {
    en: 'Users',
    es: 'Usuarios'
  },
  'admin.roles': {
    en: 'Roles',
    es: 'Roles'
  },
  'admin.permissions': {
    en: 'Permissions',
    es: 'Permisos'
  },
  'admin.title': {
    en: 'Admin Dashboard',
    es: 'Panel de Administración'
  },
  'admin.createUser': {
    en: 'Create User',
    es: 'Crear Usuario'
  },
  'admin.editUser': {
    en: 'Edit User',
    es: 'Editar Usuario'
  },
  'admin.deleteUser': {
    en: 'Delete User',
    es: 'Eliminar Usuario'
  },
  'admin.createRole': {
    en: 'Create Role',
    es: 'Crear Rol'
  },
  'admin.editRole': {
    en: 'Edit Role',
    es: 'Editar Rol'
  },
  'admin.deleteRole': {
    en: 'Delete Role',
    es: 'Eliminar Rol'
  },
  'admin.createPermission': {
    en: 'Create Permission',
    es: 'Crear Permiso'
  },
  'admin.editPermission': {
    en: 'Edit Permission',
    es: 'Editar Permiso'
  },
  'admin.deletePermission': {
    en: 'Delete Permission',
    es: 'Eliminar Permiso'
  },
  'admin.save': {
    en: 'Save',
    es: 'Guardar'
  },
  'admin.cancel': {
    en: 'Cancel',
    es: 'Cancelar'
  },
  'admin.name': {
    en: 'Name',
    es: 'Nombre'
  },
  'admin.email': {
    en: 'Email',
    es: 'Correo electrónico'
  },
  'admin.username': {
    en: 'Username',
    es: 'Nombre de usuario'
  },
  'admin.password': {
    en: 'Password',
    es: 'Contraseña'
  },
  'admin.role': {
    en: 'Role',
    es: 'Rol'
  },
  'admin.permissionsList': {
    en: 'Permissions List',
    es: 'Lista de Permisos'
  },
  'admin.userList': {
    en: 'User List',
    es: 'Lista de Usuarios'
  },
  'admin.roleList': {
    en: 'Role List',
    es: 'Lista de Roles'
  },
  'admin.permissionList': {
    en: 'Permission List',
    es: 'Lista de Permisos'
  },
  'admin.areYouSure': {
    en: 'Are you sure?',
    es: '¿Estás seguro?'
  },
  'admin.cannotBeUndone': {
    en: 'This action cannot be undone.',
    es: 'Esta acción no se puede deshacer.'
  },
  'admin.deleteConfirmation': {
    en: 'Yes, delete it!',
    es: '¡Sí, bórralo!'
  },
  'admin.rolesAndPermissions': {
    en: 'Roles & Permissions',
    es: 'Roles y Permisos'
  },
  'admin.usersManagement': {
    en: 'Users Management',
    es: 'Gestión de Usuarios'
  },
  'admin.noUsersFound': {
    en: 'No users found.',
    es: 'No se encontraron usuarios.'
  },
  'admin.noRolesFound': {
    en: 'No roles found.',
    es: 'No se encontraron roles.'
  },
  'admin.noPermissionsFound': {
    en: 'No permissions found.',
    es: 'No se encontraron permisos.'
  },
  'admin.create': {
    en: 'Create',
    es: 'Crear'
  },
  'admin.edit': {
    en: 'Edit',
    es: 'Editar'
  },
  'admin.delete': {
    en: 'Delete',
    es: 'Eliminar'
  },
  'admin.details': {
    en: 'Details',
    es: 'Detalles'
  },
  'admin.createdAt': {
    en: 'Created At',
    es: 'Creado En'
  },
  'admin.updatedAt': {
    en: 'Updated At',
    es: 'Actualizado En'
  },
  'admin.id': {
    en: 'ID',
    es: 'ID'
  },
  'admin.actions': {
    en: 'Actions',
    es: 'Acciones'
  },
  'admin.editDetails': {
    en: 'Edit Details',
    es: 'Editar Detalles'
  },
  'admin.general': {
    en: 'General',
    es: 'General'
  },
  'admin.security': {
    en: 'Security',
    es: 'Seguridad'
  },
  'admin.profile': {
    en: 'Profile',
    es: 'Perfil'
  },
  'admin.preferences': {
    en: 'Preferences',
    es: 'Preferencias'
  },
  'admin.notifications': {
    en: 'Notifications',
    es: 'Notificaciones'
  },
  'admin.appearance': {
    en: 'Appearance',
    es: 'Apariencia'
  },
  'admin.language': {
    en: 'Language',
    es: 'Idioma'
  },
  'admin.theme': {
    en: 'Theme',
    es: 'Tema'
  },
  'admin.saveChanges': {
    en: 'Save Changes',
    es: 'Guardar Cambios'
  },
  'admin.resetPassword': {
    en: 'Reset Password',
    es: 'Restablecer Contraseña'
  },
  'admin.currentPassword': {
    en: 'Current Password',
    es: 'Contraseña Actual'
  },
  'admin.newPassword': {
    en: 'New Password',
    es: 'Nueva Contraseña'
  },
  'admin.confirmPassword': {
    en: 'Confirm Password',
    es: 'Confirmar Contraseña'
  },
  'admin.changePassword': {
    en: 'Change Password',
    es: 'Cambiar Contraseña'
  },
  'admin.accessDenied': {
    en: 'Access Denied',
    es: 'Acceso Denegado'
  },
  'admin.unauthorized': {
    en: 'Unauthorized',
    es: 'No autorizado'
  },
  'admin.forbidden': {
    en: 'Forbidden',
    es: 'Prohibido'
  },
  'admin.pageNotFound': {
    en: 'Page Not Found',
    es: 'Página No Encontrada'
  },
  'admin.oops': {
    en: 'Oops!',
    es: '¡Ups!'
  },
  'admin.backToDashboard': {
    en: 'Back to Dashboard',
    es: 'Volver al Panel'
  },
  'admin.somethingWentWrong': {
    en: 'Something went wrong.',
    es: 'Algo salió mal.'
  },
  'admin.tryAgain': {
    en: 'Please try again.',
    es: 'Por favor, inténtelo de nuevo.'
  },
  'admin.noResultsFound': {
    en: 'No results found.',
    es: 'No se encontraron resultados.'
  },
  'admin.loading': {
    en: 'Loading...',
    es: 'Cargando...'
  },
  'admin.search': {
    en: 'Search...',
    es: 'Buscar...'
  },
  'admin.clear': {
    en: 'Clear',
    es: 'Limpiar'
  },
  'admin.apply': {
    en: 'Apply',
    es: 'Aplicar'
  },
  'admin.filters': {
    en: 'Filters',
    es: 'Filtros'
  },
  'admin.all': {
    en: 'All',
    es: 'Todos'
  },
  'admin.active': {
    en: 'Active',
    es: 'Activo'
  },
  'admin.inactive': {
    en: 'Inactive',
    es: 'Inactivo'
  },
  'admin.status': {
    en: 'Status',
    es: 'Estado'
  },
  'admin.editUserPermissions': {
    en: 'Edit User Permissions',
    es: 'Editar Permisos de Usuario'
  },
  'admin.userPermissionsUpdated': {
    en: 'User permissions updated successfully!',
    es: '¡Permisos de usuario actualizados con éxito!'
  },
  'admin.userCreatedSuccessfully': {
    en: 'User created successfully!',
    es: '¡Usuario creado con éxito!'
  },
  'admin.userUpdatedSuccessfully': {
    en: 'User updated successfully!',
    es: '¡Usuario actualizado con éxito!'
  },
  'admin.userDeletedSuccessfully': {
    en: 'User deleted successfully!',
    es: '¡Usuario eliminado con éxito!'
  },
  'admin.roleCreatedSuccessfully': {
    en: 'Role created successfully!',
    es: '¡Rol creado con éxito!'
  },
  'admin.roleUpdatedSuccessfully': {
    en: 'Role updated successfully!',
    es: '¡Rol actualizado con éxito!'
  },
  'admin.roleDeletedSuccessfully': {
    en: 'Role deleted successfully!',
    es: '¡Rol eliminado con éxito!'
  },
  'admin.permissionCreatedSuccessfully': {
    en: 'Permission created successfully!',
    es: '¡Permiso creado con éxito!'
  },
  'admin.permissionUpdatedSuccessfully': {
    en: 'Permission updated successfully!',
    es: '¡Permiso actualizado con éxito!'
  },
  'admin.permissionDeletedSuccessfully': {
    en: 'Permission deleted successfully!',
    es: '¡Permiso eliminado con éxito!'
  },
  'admin.invalidData': {
    en: 'Invalid data. Please check your inputs.',
    es: 'Datos inválidos. Por favor, revise sus entradas.'
  },
  'admin.confirmDelete': {
    en: 'Confirm Delete',
    es: 'Confirmar Eliminación'
  },
  'admin.deleteThisUser': {
    en: 'Delete this user?',
    es: '¿Eliminar este usuario?'
  },
  'admin.deleteThisRole': {
    en: 'Delete this role?',
    es: '¿Eliminar este rol?'
  },
  'admin.deleteThisPermission': {
    en: 'Delete this permission?',
    es: '¿Eliminar este permiso?'
  },
  'admin.yesDelete': {
    en: 'Yes, Delete',
    es: 'Sí, Eliminar'
  },
  'admin.noCancel': {
    en: 'No, Cancel',
    es: 'No, Cancelar'
  },
  'admin.userManagement': {
    en: 'User Management',
    es: 'Gestión de Usuarios'
  },
  'admin.roleManagement': {
    en: 'Role Management',
    es: 'Gestión de Roles'
  },
  'admin.permissionManagement': {
    en: 'Permission Management',
    es: 'Gestión de Permisos'
  },
  'admin.createANewUser': {
    en: 'Create a New User',
    es: 'Crear un Nuevo Usuario'
  },
  'admin.createANewRole': {
    en: 'Create a New Role',
    es: 'Crear un Nuevo Rol'
  },
  'admin.createANewPermission': {
    en: 'Create a New Permission',
    es: 'Crear un Nuevo Permiso'
  },
  'admin.editAnExistingUser': {
    en: 'Edit an Existing User',
    es: 'Editar un Usuario Existente'
  },
  'admin.editAnExistingRole': {
    en: 'Edit an Existing Role',
    es: 'Editar un Rol Existente'
  },
  'admin.editAnExistingPermission': {
    en: 'Edit an Existing Permission',
    es: 'Editar un Permiso Existente'
  },
  'admin.viewUserDetails': {
    en: 'View User Details',
    es: 'Ver Detalles del Usuario'
  },
  'admin.viewRoleDetails': {
    en: 'View Role Details',
    es: 'Ver Detalles del Rol'
  },
  'admin.viewPermissionDetails': {
    en: 'View Permission Details',
    es: 'Ver Detalles del Permiso'
  },
  'admin.areYouSureYouWantToDeleteThisUser': {
    en: 'Are you sure you want to delete this user?',
    es: '¿Estás seguro de que quieres eliminar este usuario?'
  },
  'admin.areYouSureYouWantToDeleteThisRole': {
    en: 'Are you sure you want to delete this role?',
    es: '¿Estás seguro de que quieres eliminar este rol?'
  },
  'admin.areYouSureYouWantToDeleteThisPermission': {
    en: 'Are you sure you want to delete this permission?',
    es: '¿Estás seguro de que quieres eliminar este permiso?'
  },
  'admin.thisActionCannotBeUndone': {
    en: 'This action cannot be undone.',
    es: 'Esta acción no se puede deshacer.'
  },
  'admin.yesImSure': {
    en: 'Yes, I\'m Sure',
    es: 'Sí, Estoy Seguro'
  },
  'admin.noCancelDeletion': {
    en: 'No, Cancel Deletion',
    es: 'No, Cancelar Eliminación'
  },
  'admin.userSuccessfullyCreated': {
    en: 'User Successfully Created',
    es: 'Usuario Creado Exitosamente'
  },
  'admin.roleSuccessfullyCreated': {
    en: 'Role Successfully Created',
    es: 'Rol Creado Exitosamente'
  },
  'admin.permissionSuccessfullyCreated': {
    en: 'Permission Successfully Created',
    es: 'Permiso Creado Exitosamente'
  },
  'admin.userSuccessfullyUpdated': {
    en: 'User Successfully Updated',
    es: 'Usuario Actualizado Exitosamente'
  },
  'admin.roleSuccessfullyUpdated': {
    en: 'Role Successfully Updated',
    es: 'Rol Actualizado Exitosamente'
  },
  'admin.permissionSuccessfullyUpdated': {
    en: 'Permission Successfully Updated',
    es: 'Permiso Actualizado Exitosamente'
  },
  'admin.userSuccessfullyDeleted': {
    en: 'User Successfully Deleted',
    es: 'Usuario Eliminado Exitosamente'
  },
  'admin.roleSuccessfullyDeleted': {
    en: 'Role Successfully Deleted',
    es: 'Rol Eliminado Exitosamente'
  },
  'admin.permissionSuccessfullyDeleted': {
    en: 'Permission Successfully Deleted',
    es: 'Permiso Eliminado Exitosamente'
  },
  'admin.thereWasAnError': {
    en: 'There was an error.',
    es: 'Hubo un error.'
  },
  'admin.pleaseTryAgain': {
    en: 'Please try again.',
    es: 'Por favor, inténtelo de nuevo.'
  },
  'admin.ok': {
    en: 'OK',
    es: 'Aceptar'
  },
  'admin.close': {
    en: 'Close',
    es: 'Cerrar'
  },
  'admin.editUserRoles': {
    en: 'Edit User Roles',
    es: 'Editar Roles de Usuario'
  },
  'admin.userRolesUpdated': {
    en: 'User roles updated successfully!',
    es: '¡Roles de usuario actualizados con éxito!'
  },
  'admin.editRolePermissions': {
    en: 'Edit Role Permissions',
    es: 'Editar Permisos de Rol'
  },
  'admin.rolePermissionsUpdated': {
    en: 'Role permissions updated successfully!',
    es: '¡Permisos de rol actualizados con éxito!'
  },
  'nav.feedback': {
    en: 'Feedback',
    es: 'Comentarios'
  },
  'nav.bug': {
    en: 'Bug',
    es: 'Error'
  },
  'help.title': {
    en: 'Help',
    es: 'Ayuda'
  },
  'help.copyLink': {
    en: 'Copy Link',
    es: 'Copiar Enlace'
  },
  'help.linkCopied': {
    en: 'Link Copied',
    es: 'Enlace Copiado'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>((localStorage.getItem('language') as Language) || 'en');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
