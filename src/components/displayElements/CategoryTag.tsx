type Props = {
  category: string;
};

const CategoryTag = ({ category }: Props) => {
  return (
    <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs">
      {category}
    </span>
  );
};

export default CategoryTag;
