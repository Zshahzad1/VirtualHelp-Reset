import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  // Formik configuration
  const { code } = useParams();
  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("New password is required"),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      Reset(values);
      resetForm();
    },
  });

  const Reset = async (data) => {
    try {
      // Call the API with Axios
      const response = await axios.post(
        `http://16.170.88.89/api/auth/reset-password/${code}`,
        data,
        {
          headers: {
            Authorization: `Bearer 2d765414dd3245058d355605dfb4858aea56ecc50e3c9241e4849e01d7daf9104518be0c29ef5e2236c1fef1e128aa991701c482d940c8bcd3dd03bcbc34e47ab7b837b4a44d41adffc4ca7b19d1970646eae60c5267ef5a066a30117d390b72dca766822ff9e4f2df838f273d25d81c5db657472ce310eb41e201e29cebf2a0`,
          },
        }
      );

      // Handle success response
      console.log("Password reset successfully", response.data);
    } catch (error) {
      // Handle error
      console.error(
        "Error resetting password",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative p-4 w-full max-w-[450px] max-h-full">
        <div className="relative bg-white rounded-lg shadow-2xl">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Reset Password
            </h3>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="p-4 flex flex-col gap-3 md:p-5 space-y-4"
          >
            <div>
              <label>New Password</label>
              <input
                type="password"
                name="password"
                placeholder="New Password"
                className={`w-full mb-3 border px-3 py-2 ${
                  formik.errors.password && formik.touched.password
                    ? "border-red-500"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div>
              <label>Confirm Password</label>
              <input
                type="password"
                name="passwordConfirmation"
                placeholder="Confirm Password"
                className={`w-full mb-3 border px-3 py-2 ${
                  formik.errors.passwordConfirmation &&
                  formik.touched.passwordConfirmation
                    ? "border-red-500"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirmation}
              />
              {formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.passwordConfirmation}
                </div>
              ) : null}
            </div>
            <button
              type="submit"
              className="bg-[#2408c4] font-semibold text-white w-full rounded-[40px] h-[40px]"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
