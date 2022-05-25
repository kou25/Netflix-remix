import { Link } from "@remix-run/react";
import { GiPartyPopper } from "react-icons/gi";
import { BiLogIn } from "react-icons/bi";
import { auth } from "~/utils/firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { createUserSession } from "~/sessions";
import { RegisterSchema } from "~/models/login/data/registerSchema";
import { withZod } from "@remix-validated-form/with-zod";
import {
  useFormContext,
  useIsSubmitting,
  ValidatedForm,
  validationError
} from "remix-validated-form";
import { TextField } from "~/models/core/ui/FormFieldValidated";
import { Button } from "~/models/core/ui/Button";

const validator = withZod(RegisterSchema);

export const action = async ({ request }: any) => {
  const data = await validator.validate(await request.formData());
  if (data.error) return validationError(data.error);
  const { email, password } = data.data;

  //perform a signout to clear any active sessions
  await auth.signOut();

  //@ts-ignore
  const { user, error: signUpError } = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  if (!signUpError) {
    //@ts-ignore
    return createUserSession("/admin/movies", auth?.currentUser?.access_token);
  }
  return { user, signUpError };
};

const index = () => {
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
        <div className="w-1/2 flex flex-col justify-center items-center">
          <span className="flex">
            <GiPartyPopper className="text-3xl text-stone-500" />{" "}
            <p className="ml-2 text-3xl font-jennaSue text-stone-500">
              Join with us!!
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
              <div className="my-4">
                <TextField
                  type="password"
                  placeholder="password"
                  name="password"
                />
              </div>
              <div className="my-4">
                <TextField
                  type="password"
                  placeholder="confirm password"
                  name="confirm"
                />
              </div>
              <div className="w-full flex justify-end items-center mt-4 ">
                <SubmitButton />
              </div>
            </ValidatedForm>
            <div className="mt-16 w-full flex justify-between items-center">
              <p className="text-stone-500 ml-2">
                {"already have an account? Login here ->"}{" "}
              </p>
              <span className="rounded-full p-1 border border-red-400 cursor-pointer  hover:shadow-lg">
                <Link to="/login">
                  <BiLogIn className="text-red-400 text-xl" />
                </Link>
              </span>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <img
            className="h-full w-full object-contain"
            src="https://i.pinimg.com/564x/f4/24/ad/f424ad725bc526341e8132f0a4a7df5e.jpg"
            alt="background"
          />
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
      {isSubmitting ? "Registering" : "Sign up"}
    </Button>
  );
}

export default index;
