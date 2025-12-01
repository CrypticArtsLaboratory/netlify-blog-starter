import Link from 'next/link';
import Navigation from './Navigation';

export default function Header({name}) {
    return (

        <header className="pt-20 pb-12 flex justify-between items-center mx-auto px-4 w-10/12">
        <div className="flex items-center">
                <div
                    className="w-12 h-12 mr-4 rounded-full "/>
                <p className="text-2xl dark:text-white">
                    {/*<Link href="/">{name}</Link>*/}
                </p>
            </div>
            <div className="space-x-11"> </div>
            {/*<Navigation className="flex items-center"/>*/}
        </header>
    );
}
