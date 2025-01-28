import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("runs/:id","routes/sampleRunView.tsx"),

] satisfies RouteConfig;
