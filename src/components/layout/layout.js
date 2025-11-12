'use client'
import Link from 'next/link';
import React from 'react';
import { VscListSelection } from "react-icons/vsc";
import { IoAdd } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { signOut, useSession } from 'next-auth/react';
import { FiLogOut } from 'react-icons/fi';

const Layout = ({children}) => {

    const { status } = useSession();

    const logOutHandler = async() => {
        signOut();
    }


    return (
        <div className="container">

            <header className="header">
                <h1>Test App</h1>
                { status === 'authenticated' &&
                    <button onClick={() => logOutHandler()}>
                        Sign Out<FiLogOut />
                    </button>
                }
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