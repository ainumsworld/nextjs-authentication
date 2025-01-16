import { type Metadata } from "next";

type APP_METADATA_TYPE = {
  login: Metadata;
  register: Metadata;
  forgotPassword: Metadata;
  products: Metadata;
  // singleProduct: () => Promise<Metadata>;
};

export const APP_METADATA: APP_METADATA_TYPE = {
  // auth
  login: {
    title: "Login",
    description:
      "Access your account securely with our authentication system. Log in with your credentials or social accounts.",
  },
  register: {
    title: "Register",
    description:
      "Create your account in a few simple steps. Start using our secure and reliable authentication app today.",
  },
  forgotPassword: {
    title: "Forgot Password",
    description:
      "Recover your account quickly and securely. Reset your password in just a few steps.",
  },
  //
  products: { title: "Products" },
  //! eg. (dynamic)
  //  singleProduct: async (
  //     { params, searchParams }: Props,
  //     parent: ResolvingMetadata,
  //   ) => {
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
  //   },
};
