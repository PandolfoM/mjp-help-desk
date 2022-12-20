import { Formik } from "formik";
import React from "react";

function AppForm({ inititalValues, onSubmit, validationSchema, children }) {
  return (
    <Formik
      initialValues={inititalValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
