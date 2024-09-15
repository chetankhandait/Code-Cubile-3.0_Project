import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const NewsCarousel = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=3268eb780c3a4d0b9df78a3888f0c189`
        );
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div className="text-center text-xl">Loading news...</div>;
  }

  const truncateTitle = (title, wordLimit) => {
    const words = title.split(" ");
    if (words.length <= wordLimit) return title;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1920 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 1920, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="container  mx-auto py rounded-lg ">
      <h1 className="text-xl font-bold mb-2">Latest News</h1>
      <Carousel
        className=""
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={2000}
      >
        {articles.map((article, index) => (
          <div
            key={index}
            className="relative bg-white max-w-4xl mx-auto rounded-lg shadow-md overflow-hidden h-52 "
          >
            <img
              className="w-full h-44 object-cover rounded-lg "
              src={article.urlToImage || "https://via.placeholder.com/400"}
              alt={article.title}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
              <div className="p-4 text-white backdrop-blur-lg bg-opacity-60 w-full">
                <h2 className="text-sm font-semibold mb-2">
                  {truncateTitle(article.title, 10)}
                </h2>
                {/* <p className="mb-4">{article.description}</p> */}
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-500 hover:underline"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default NewsCarousel;
