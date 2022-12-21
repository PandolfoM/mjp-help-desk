import React from "react";
import { useFormikContext } from "formik";

import TextInput from "../TextInput";

function AppFormField({ name, style, ...props }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  return (
    <TextInput
      onBlur={() => setFieldTouched(name)}
      onChangeText={(text) => setFieldValue(name, text)}
      value={values[name]}
      style={style}
      {...props}
    />
  );
}

export default AppFormField;
