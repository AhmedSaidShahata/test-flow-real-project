import { useRouter } from "vue-router";
const router = useRouter();
 const ToRoute = (link) => {
    router.push(link)
}
export default ToRoute