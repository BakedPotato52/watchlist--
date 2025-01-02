
import { signIn, providerMap } from "@/app/api/auth/[...nextauth]/providers";

export default function SignInPage() {
    <div className="flex flex-col gap-2 p-6 m-8 w-full bg-white rounded shadow-lg">
        {Object.values(providerMap).map((provider) => (
            <form
                className="[&>div]:last-of-type:hidden"
                key={provider.id}
                action={async (formData) => {
                    "use server";
                    if (provider.id === "credentials") {
                        await signIn(provider.id, {
                            redirectTo: "/",
                            username: formData.get('username'),
                            password: formData.get('password')
                        });
                    } else {
                        await signIn(provider.id, { redirectTo: "/" });
                    }
                }}
            >
                {provider.id === "credentials" && (
                    <>
                        <label className="text-base font-light text-neutral-800">
                            username
                            <input
                                className="block flex-1 p-3 w-full font-normal rounded-md border border-gray-200 transition sm:text-sm placeholder:font-light placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-zinc-500"
                                required
                                data-1p-ignore
                                placeholder="username"
                                name="username"
                                type="text"
                            />
                        </label>
                        <label className="text-base font-light text-neutral-800">
                            Password
                            <input
                                className="block flex-1 p-3 w-full font-normal rounded-md border border-gray-200 transition sm:text-sm placeholder:font-light placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-zinc-500"
                                required
                                data-1p-ignore
                                placeholder="password"
                                name="password"
                                type="password"
                            />
                        </label>
                    </>
                )}
                <button
                    type="submit"
                    className="flex justify-center items-center px-4 mt-2 space-x-2 w-full h-12 text-base font-light text-white rounded transition focus:ring-2 focus:ring-offset-2 focus:outline-none bg-zinc-800 hover:bg-zinc-900 focus:ring-zinc-800"
                >
                    <span>Sign in with {provider.name}</span>
                </button>
                <div className="flex gap-2 items-center my-4">
                    <div className="flex-1 bg-neutral-300 h-[1px]" />
                    <span className="text-xs leading-4 uppercase text-neutral-500">
                        or
                    </span>
                    <div className="flex-1 bg-neutral-300 h-[1px]" />
                </div>
            </form>
        ))}
    </div>
}