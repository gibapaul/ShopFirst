import React from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

const Breadcrumb = ({ title, category }) => {
    const routes = [
        { path: "/", breadcrumb: "Home" }, // Đường dẫn chính
        { path: "/:category", breadcrumb: category || 'Category' }, // Danh mục (nếu có)
        { path: "/:category/:pid/:title", breadcrumb: title || 'Title' } // Tiêu đề sản phẩm (nếu có)
    ];

    const breadcrumb = useBreadcrumbs(routes);

    return (
        <div className='text-sm flex items-center gap-1'>
            {breadcrumb?.filter(el => ! el.match.route === false).map(({ match, breadcrumb }, index, self) => (
                <Link className='flex items-center hover:text-main gap-1' key={match.pathname} to={match.pathname}>
                    <span className='capitalize'>{breadcrumb}</span>
                    {index !== self.length - 1 && <IoIosArrowForward />}
                </Link>
            ))}
        </div>
    );
}

export default Breadcrumb;
