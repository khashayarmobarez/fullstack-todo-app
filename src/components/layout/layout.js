import Link from 'next/link';
import React from 'react';
import { VscListSelection } from "react-icons/vsc";
import { IoAdd } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const Layout = ({children}) => {
    return (
        <div className="container">

            <header className="header">
                <h1>khashayar Todo App</h1>
            </header>

            <div className='container--main'>

                <aside>
                    <p>Welcome 👋</p>
                    <ul>
                        <li>
                            <VscListSelection />
                            <Link href="/">to dos</Link>
                        </li>
                        <li>
                            <IoAdd />
                            <Link href="/addToDo">add to do</Link>
                        </li>
                        <li>
                            <CgProfile  />
                            <Link href="/profile">profile</Link>
                        </li>
                    </ul>
                </aside>

                <section>
                    {children}
                </section>

            </div>
            
        </div>
    );
};

export default Layout;