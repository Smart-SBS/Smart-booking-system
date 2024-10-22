import React from 'react'

import gallery1 from "../../../../assets/images/gallery/1.jpg";
import gallery2 from "../../../../assets/images/gallery/2.jpg";
import gallery3 from "../../../../assets/images/gallery/3.jpg";
import gallery4 from "../../../../assets/images/gallery/4.jpg";
import gallery5 from "../../../../assets/images/gallery/5.jpg";
import gallery6 from "../../../../assets/images/gallery/6.jpg";
import gallery7 from "../../../../assets/images/gallery/7.jpg";
import gallery8 from "../../../../assets/images/gallery/8.jpg";
import gallery9 from "../../../../assets/images/gallery/9.jpg";

const Gallery = () => {
    return (
        <ul className="grid-wrapper li_animate list-unstyled mb-0">
            <li><img src={gallery1} alt="" /></li>
            <li><img src={gallery2} alt="" /></li>
            <li className="tall"><img src={gallery3} alt="" /></li>
            <li className="wide"><img src={gallery4} alt="" /></li>
            <li><img src={gallery5} alt="" /></li>
            <li className="tall"><img src={gallery6} alt="" /></li>
            <li className="big"><img src={gallery7} alt="" /></li>
            <li><img src={gallery1} alt="" /></li>
            <li className="wide"><img src={gallery8} alt="" /></li>
            <li className="big"><img src={gallery9} alt="" /></li>
            <li className="tall"><img src={gallery1} alt="" /></li>
            <li><img src={gallery8} alt="" /></li>
            <li><img src={gallery4} alt="" /></li>
            <li><img src={gallery3} alt="" /></li>
            <li><img src={gallery6} alt="" /></li>
        </ul>
    )
}

export default Gallery