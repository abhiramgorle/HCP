const Button = ({
  name,
  link,
  arrow = false,
  color = "red",
  arrowPosition = "right",
  onClick = () => {
    if (link) {
      window.location.href = link;
    }
  },
}: {
  name: string;
  link?: string;
  arrow?: boolean;
  color?: string;
  arrowPosition?: "left" | "right";
  onClick?: () => void; // Optional onClick handler
}) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <a
        href={link}
        onClick={(e) => {
          e.preventDefault(); // Prevent default navigation
          onClick?.(); // Call the onClick handler if provided
        }}
        className={`px-10 w-fit py-2 border-2 m-5 ${
          color === "red" ? "border-[#CE2A35]" : "border-[#2B70B4]"
        } rounded-3xl flex flex-row items-center`}
      >
        {arrow && arrowPosition === "left" && (
          <span className="mr-2 text-black">←</span>
        )}
        <span className="text-sm font-(family-name:--font-open-sans) font-extrabold tracking-wider text-black uppercase">
          {name}
        </span>
        {arrow && arrowPosition === "right" && (
          <span className="ml-2 text-black">→</span>
        )}
      </a>
    </div>
  );
};

export default Button;