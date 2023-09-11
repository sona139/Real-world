import React from "react";
import Banner from "./Banner";
import Home from "./Home";
import Sidebar from "../../components/Sidebar";
import TagProvider from "../../store/Tag/TagProvider";

const HomePage = () => {
	return (
		<div className="home-page">
			<Banner />
			<div className="container page">
				<div className="row">
					<TagProvider>
						<Home />
						<div className="col-md-3">
							<Sidebar />
						</div>
					</TagProvider>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
