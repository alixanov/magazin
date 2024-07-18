import React from 'react';
import { AdverstingSwiper, CircleSwiper} from "../../page";
import { Input } from "../../constants";

import "./home.css";

const Home = () => {
     return (
          <div className='home'>
               <div className="home__title">
                    <h2>
                         magazin
                    </h2>
               </div>
               <Input />
               <AdverstingSwiper />
               <CircleSwiper />
          </div>
     );
}

export default Home;
