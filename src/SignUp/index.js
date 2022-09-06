import {useContext} from "react";
import {UserContext} from "../context/userContext";
import {useNavigate} from "react-router-dom";

import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    signUpEmail: yup.string().email().required(),
    signUpPw: yup.string().min(8).required(),
    signUpPwRepeat: yup.string()
        .min(8)
        .required()
        .oneOf([yup.ref("signUpPw")], "Passwords do not match"),
});

export default function SignUp() {
    const {signUp} = useContext(UserContext);
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const navigate = useNavigate();

    async function onSubmit(data) {
        try {
            const cred = await signUp(
                data.signUpEmail,
                data.signUpPw
            );
            navigate("/admin")
        } catch (error) {
            if (error.code === "auth/invalid-email") {
                alert("error during signup: invalid email")
            }

            if (error.code === "auth/email-already-in-use") {
                alert("error during signup: email already in use")
            }
        }
    }

    return (
        <section>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Sign up</h1>
                <label
                    htmlFor="signUpEmail"
                >Email Address</label>
                <input
                    id="signUpEmail"
                    type="email"
                    {...register("signUpEmail")}
                />
                <p>{errors.signUpEmail?.message}</p>
                <label
                    htmlFor="signUpPw"
                >Password</label>
                <input
                    id="signUpPw"
                    type="password"
                    {...register("signUpPw")}
                />
                <p>{errors.signUpPw?.message}</p>
                <label
                    htmlFor="signUpPwRepeat"
                >Password (repeat)</label>
                <input
                    id="signUpPwRepeat"
                    type="password"
                    {...register("signUpPwRepeat")}
                />
                <p>{errors.signUpPwRepeat?.message}</p>
                <button type="submit">Submit</button>
            </form>
        </section>
    );
}