import React, { useEffect } from "react";

export default function VismeEmbed() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div
            className="visme_d"
            data-title="Webinar Registration Form"
            data-url="g7ddqxx0-untitled-project?fullPage=true"
            data-domain="forms"
            data-full-page="true"
            data-min-height="100vh"
            data-form-id="133190"
        ></div>
    );
}
