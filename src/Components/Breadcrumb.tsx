import React from 'react';
import { Link } from 'react-router-dom';

type BreadcrumbPath = {
    name: string;
    link: string;
};

interface BreadcrumbProps {
    paths: BreadcrumbPath[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ paths }) => {
    return (
        <nav aria-label="breadcrumb" className="mb-4">
            <ol className="flex list-none p-0 m-0">
                {paths.map((path, index) => (
                    <li key={index} className="mr-2 text-gray-500">
                        {index < paths.length - 1 ? (
                            <>
                                <Link to={path.link} className="text-gray-500 no-underline hover:underline">
                                    {path.name}
                                </Link>
                                <span className="mx-2 text-red-500">&gt;</span>
                            </>
                        ) : (
                            <span>{path.name}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;