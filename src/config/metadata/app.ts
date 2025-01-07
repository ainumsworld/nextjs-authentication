import { type Metadata } from "next";

export namespace APP_METADATA {
  // auth
  export const login: Metadata = {
    title: "Login",
    description:
      "Access your account securely with our authentication system. Log in with your credentials or social accounts.",
  };
  export const register: Metadata = {
    title: "Register",
    description:
      "Create your account in a few simple steps. Start using our secure and reliable authentication app today.",
  };
  export const forgotPassword: Metadata = {
    title: "Forgot Password",
    description:
      "Recover your account quickly and securely. Reset your password in just a few clicks.",
  };
  //
  export const products: Metadata = { title: "Products" };
  //! eg. (dynamic)
  //   export const singleProduct = async (
  //     { params, searchParams }: Props,
  //     parent: ResolvingMetadata,
  //   ): Promise<Metadata> => {
  //     // read route params
  //     const id = (await params).id;

  //     // fetch data
  //     const product = await fetch(`https://.../${id}`).then((res) => res.json());

  //     // optionally access and extend (rather than replace) parent metadata
  //     const previousImages = (await parent).openGraph?.images || [];

  //     return {
  //       title: product.title,
  //       openGraph: {
  //         images: ["/some-specific-page-image.jpg", ...previousImages],
  //       },
  //     };
  //   };
}
