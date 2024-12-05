"use client";
import { signIn } from "next-auth/react";

import GoogleButton from "react-google-button";
export default function AuthButton({className}:{className?:string}) {
	return (
		<div>
			<GoogleButton className={className} onClick={() => signIn("google", { callbackUrl: "/" })} />{" "}
		</div>
	);
}
