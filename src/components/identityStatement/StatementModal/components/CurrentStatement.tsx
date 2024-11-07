interface IProps {
  from: string | null;
  current?: string;
}

const CurrentStatement = ({ from, current }: IProps) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Current {from} statement :</h2>
      </div>
      <div className="mt-2 bg-gray-100 p-4 rounded-lg">
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text
        </p>
      </div>
    </>
  );
};

export default CurrentStatement;
