import React from "react";

const ToggleItem = ({ title }) => {
	return (
		<li className="nav-item ">
			<p className="nav-link active">{title}</p>
		</li>
	);
};

const ToggleArticle = ({ toggleList }) => {
	return (
		<div className="posts-toggle">
			<ul className="nav nav-pills outline-active">
				{toggleList.map((toggleTitle) => (
					<ToggleItem title={toggleTitle} />
				))}
			</ul>
		</div>
	);
};

export default ToggleArticle;
