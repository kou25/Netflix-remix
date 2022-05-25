import { Link, useActionData } from "@remix-run/react";
import { GiArchiveRegister, GiPartyPopper } from "react-icons/gi";
import { auth } from "~/utils/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { createUserSession } from "~/sessions";
import type { ActionFunction } from "@remix-run/node";
import { LoginSchema } from "~/models/login/data/loginSchema";
import { withZod } from "@remix-validated-form/with-zod";
import {
  useFormContext,
  useIsSubmitting,
  ValidatedForm,
  validationError
} from "remix-validated-form";
import { TextField } from "~/models/core/ui/FormFieldValidated";
import { Button } from "~/models/core/ui/Button";

const validator = withZod(LoginSchema);

export const action: ActionFunction = async ({ request }: any) => {
  const data = await validator.validate(await request.formData());
  if (data.error) return validationError(data.error);
  const { email, password } = data.data;

  //@ts-ignore
  const { user, error } = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  // if signin was successful then we have a user
  if (user) {
    return createUserSession("/", await user.getIdToken());
  }
  return { error };
};

const Login = () => {
  const actionData = useActionData();
  return (
    <div className="h-[80vh]">
      <div className="h-fit">
        <img
          src="https://index.impakter.com/wp-content/uploads/2020/11/Netflix-Logo.png"
          alt="logo"
          className="w-[150px] pl-5 object-contain"
        />
      </div>
      <div className="flex  m-auto h-full">
        <div className="w-1/2 flex justify-center items-center">
          <img
            className="h-full w-full object-contain"
            src=" https://i.pinimg.com/564x/82/31/9c/82319c25a3d58ea538b482ed740e1988.jpg"
            // https://i.pinimg.com/564x/82/31/9c/82319c25a3d58ea538b482ed740e1988.jpg
            alt="background"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center">
          <span className="flex">
            <GiPartyPopper className="text-3xl text-stone-500" />{" "}
            <p className="ml-2 text-3xl font-jennaSue text-stone-500">
              You're back !!
            </p>
          </span>
          <div className="mt-2 w-2/4">
            <ValidatedForm validator={validator} method="post">
              <div className="my-4">
                <TextField
                  type="email"
                  placeholder="email"
                  name="email"
                  autoFocus
                />
              </div>
              <div>
                <TextField
                  type="password"
                  placeholder="password"
                  name="password"
                />
              </div>
              <div className="w-full flex justify-between items-center mt-4 ">
                <p className="text-stone-500 ml-2">oops, forgot password?</p>
                <SubmitButton />
              </div>
              <p className="text-red-500">
                {actionData?.error ? actionData?.error?.message : null}
              </p>
            </ValidatedForm>
            <div className="mt-16 w-full flex justify-between items-center">
              <p className="text-stone-500 ml-2">
                {"got no account? Register here ->"}{" "}
              </p>
              <span className="rounded-full p-1 border border-red-400 cursor-pointer  hover:shadow-lg">
                <Link to="/register">
                  <GiArchiveRegister className="text-red-400 text-xl" />
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function SubmitButton() {
  const isSubmitting = useIsSubmitting();
  const { isValid } = useFormContext();
  const disabled = isSubmitting || !isValid;

  return (
    <Button disabled={disabled} type="submit">
      {isSubmitting ? "Signing in" : "Sign in"}
    </Button>
  );
}

export default Login;
