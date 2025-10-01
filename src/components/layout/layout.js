import Link from 'next/link';
import React from 'react';

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
                            <Link href="/">to dos</Link>
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