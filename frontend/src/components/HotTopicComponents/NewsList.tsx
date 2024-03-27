import { motion } from 'framer-motion';
import NewsCard from '../HotTopicComponents/NewsCard';
import useHotTopicStore from "../../stores/hotTopicStore";
import { AxiosError } from 'axios';

// 사용 스토어의 구조를 기반으로 하는 구조
interface NewsList {
  hotTopicLink: string;
  hotTopicImg: string;
  hotTopicTitle: string;
  hotTopicShortDesc: string;
  hotTopicDate: Date;
}

const NewsList: React.FC = () => {
  const { newsData, nLoading, nError } = useHotTopicStore();


  if (nLoading) {
    return <div>Loading...</div>;
  }

  if (nError) {
    const axiosError = nError as AxiosError;
    return <div>Error: {axiosError.message}</div>;
  }

  if (!newsData || !newsData.result.length) {
    return <div>No data available</div>;
  }

  return (
    <motion.ul className="grid gap-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } }
      }}
      initial="hidden"
      animate="visible"
    >
      {newsData.result.map((news: NewsList, index: number) => (
        <motion.li key={index} className="list-none"
          variants={{
            hidden: { x: -60, opacity: 0 },
            visible: { x: 0, opacity: 1, transition: { duration: 0.3 } }
          }}
        >
          <NewsCard
            key={index}
            hotTopicLink={news.hotTopicLink}
            hotTopicImg={news.hotTopicImg}
            hotTopicTitle={news.hotTopicTitle}
            hotTopicShortDesc={news.hotTopicShortDesc}
            hotTopicDate={new Date(news.hotTopicDate)}
          />
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default NewsList;