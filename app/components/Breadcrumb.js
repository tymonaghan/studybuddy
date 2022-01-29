import React from "react";
import { useSelector } from "react-redux";
import { Breadcrumb, BreadcrumbItem, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const BreadcrumbBox = () => {
  // const { username } = useSelector((state) => state.auth);
  // const { currentProjectId, projects } = useSelector((state) => state);
  // const currentProject = projects.find((project) => {
  //   return +project.id === +currentProjectId;
  // });
  // console.log(projects);
  // console.log(currentProject);

  // return (
  //   <Breadcrumb className="crumbox">
  //     <Breadcrumb.Item href="/">{username}</Breadcrumb.Item>

  //     <Breadcrumb.Item>Projects</Breadcrumb.Item>
  //     {currentProjectId ? (
  //       <Breadcrumb.Item>currentProject.name</Breadcrumb.Item>
  //     ) : (
  //       ""
  //     )}
  //   </Breadcrumb>
  // );
  return <div>I'm helping</div>;
};

export default BreadcrumbBox;
