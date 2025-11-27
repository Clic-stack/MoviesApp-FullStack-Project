import React, { useState, useMemo } from "react";
import { Pagination, Row, Col } from "react-bootstrap";

const UniversalPagination = ({ items = [], renderItem, itemsPerPage = 8 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div>
      {/* props de Row */}
      <Row xs={1} md={2} lg={3} xl={4} className="g-4 items-select">
        {currentItems.map((item) => (
          <Col key={item.id} className="d-flex">
            {renderItem(item)}
          </Col>
        ))}
      </Row>

      <Pagination className="justify-content-center mt-3">
        <Pagination.Prev
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default UniversalPagination;
