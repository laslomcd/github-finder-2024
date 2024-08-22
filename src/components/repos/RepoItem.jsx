import React from "react";
import PropTypes from "prop-types";
import { FaEye, FaInfo, FaLink, FaStar, FaUtensils } from "react-icons/fa";

function RepoItem({ repo }) {
	return <div className="card">{repo.full_name}</div>;
}

RepoItem.propTypes = {
	repo: PropTypes.object.isRequired,
};

export default RepoItem;
