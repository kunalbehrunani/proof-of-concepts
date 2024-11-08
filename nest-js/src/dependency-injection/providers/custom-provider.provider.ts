// Custom providers are just objects that can be injected into the IoC container => to be used in modules

// Hence we declare just an object

export const config = {
    DB_CREDENTIALS: {
        DB_USER: "some-username",
        DB_PASSWORD: "some-password",
        DB_REGION: "some-region"
    }
}