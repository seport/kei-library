import React from "react";

const Error = ({error}: any) => <div className="is-flex is-justify-content-center">{error?.message}</div>

export default Error;