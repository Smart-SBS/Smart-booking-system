import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const NavMenuCategories = () => {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL
    const [pills, setPills] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_URL}/ma-nav-menu-categories`);
                if (response.data.status === 200) {
                    const categories = response.data.nav_category[0];
                    const subcategories = response.data.nav_category[1];
                    const selectedCategories = categories.slice(0, 3);
                    const selectedSubcategories = subcategories.slice(0, 2);
                    const combinedPills = [
                        ...selectedCategories.map((category) => ({ type: 'category', name: category.category_name, id: category.id })),
                        ...selectedSubcategories.map((subcategory) => ({ type: 'subcategory', name: subcategory.subcategory_name, id: subcategory.id }))
                    ];
                    setPills(combinedPills);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleCategorySearch = (pill) => {
        const path = pill.type === 'category'
            ? `/all-catalogues/category/${encodeURIComponent(pill.name)}`
            : `/all-catalogues/subcategory/${encodeURIComponent(pill.name)}`;
        navigate(path);
    };

    return (
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-4 items-start sm:items-center">
            <Link to="/" className="hover:bg-[#fa2964e6] hover:text-white block px-2 py-2 rounded">Home</Link>
            {pills.map((pill, index) => (
                <button
                    key={index}
                    className="hover:bg-pink-600 hover:text-white block px-2 py-2 rounded"
                    onClick={() => handleCategorySearch(pill)}
                >
                    {pill.name}
                </button>
            ))}
        </div>
    );
};

export default NavMenuCategories;