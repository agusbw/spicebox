import heroImage from "../assets/hero.png";
import herobg from "../assets/herobg.jpg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="hero h-screen bg-hero">
        <img
          src={herobg}
          alt="Hero Background"
          className="object-cover  w-full h-screen opacity-50 lg:opacity-20"
        />
        <div className="hero-content flex-col  lg:flex-row-reverse">
          <img src={heroImage} alt="Hero Image" className="hidden lg:block" />
          <div>
            <h1 className="text-5xl font-bold text-center lg:text-left">
              <span className="text-secondary">Discover the Delights </span>
              <br /> of Our Delicious Dishes
            </h1>
            <p className="py-6 text-center lg:text-left">
              Welcome to{" "}
              <span className="font-thin text-primary font-pacifico">
                SpiceBox
              </span>
              , your go-to destination for all things culinary. We believe that
              cooking should be a fun and enjoyable experience for everyone,
              which is why we&apos;ve curated a collection of delicious recipes
              that are sure to delight your taste buds.
            </p>
            <div className="flex justify-center lg:block">
              <Link to="/recipes" className="btn btn-secondary rounded-full">
                Explore Recipes &#8594;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
