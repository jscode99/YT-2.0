import { Stack } from "@mui/material";
import { categories } from "../utils/constant";

const SideBar = ({ selectedCategory, setSelectedCategory }) => (
  <Stack
    direction="row"
    sx={{
      overflowY: "hidden",
      height: { sx: "auto", md: "95%" },
      flexDirection: { md: "column" },
    }}
  >
    {categories.map((category, i) => (
      <button
        key={i}
        className="category-btn"
        style={{
          background: category.name === selectedCategory && "#FC1503",
          color: "whitesmoke",
        }}
        onClick={() => setSelectedCategory(category.name)}
      >
        <span
          style={{
            color: category.name === selectedCategory ? "whitesmoke" : "red",
            marginRight: "15px",
          }}
        >
          {category.icon}
        </span>
        <span
          style={{ opacity: category.name === selectedCategory ? "1" : "0.8" }}
        >
          {category.name}
        </span>
      </button>
    ))}
  </Stack>
);

export default SideBar;
