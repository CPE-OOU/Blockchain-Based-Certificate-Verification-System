import { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

// Removed unused import useEffect and CSSProperties

const Spinner = () => {
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#ffffff");

    // Moved the style inside the component
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    return (
        <ClipLoader
            color={color}
            loading={loading}
            css={override} // Corrected prop name from cssOverride to css
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    );
};

export default Spinner;
