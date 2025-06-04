type Props = {
  category: string;
};

const CategoryTagBig = ({ category }: Props) => {
  return (
    <span className="bg-custom-gray-800 text-white px-3 py-1 rounded-full text-sm md:text-lg">
      {category}
    </span>
  );
};

export default CategoryTagBig;
