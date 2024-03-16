import Header from '../components/Header'
import { Link } from "react-router-dom";
export default function Home(){
    return (
        <>
        <Header />
        <ul>
        <li>
        <Link to="Tetris">Tetris</Link>
        </li>
        <li>
        <Link to="Huarongdao">Hua Rong Dao</Link>
        </li>
        <li>
        <Link to="About">About</Link>
        </li>
        </ul>

        </>
    )
}