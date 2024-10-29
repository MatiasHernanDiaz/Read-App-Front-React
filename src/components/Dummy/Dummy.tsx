import { User } from "../../model/User";


export default function Dummy({ user } : { user: User | null }) {
    return <p>El usuario se llama { user ? user.displayName : '(no user)' }</p>
}