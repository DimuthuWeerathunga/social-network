import { Col, Row } from 'antd';
import React from 'react';

const ThreadContent = () => {
  console.log('child rerender');
  return (
    <Row>
      <Col span={22} offset={1}>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae neque
          reprehenderit repudiandae possimus vel dolor, ullam iste repellat,
          quia libero itaque a quis deleniti praesentium nobis fuga minus
          impedit sunt! Maxime quas, ea laboriosam nisi voluptatibus, distinctio
          sapiente magnam dolore esse enim, animi eos consequuntur nemo.
          Asperiores odit culpa saepe beatae explicabo alias obcaecati quo
          voluptatem adipisci tenetur repellat neque laudantium inventore sunt,
          reiciendis error pariatur illum quis praesentium nam. Eligendi
          explicabo facere cumque eius consequuntur atque commodi minima
          voluptate vitae ea distinctio ullam nihil dicta at incidunt reiciendis
          eveniet, id dolor ad asperiores unde! Labore veniam natus atque sint,
          nesciunt velit vitae hic voluptas in amet quaerat inventore qui rerum,
          accusamus, voluptatem alias ipsam! Nostrum, perferendis consectetur
          pariatur minus dicta culpa hic quaerat aliquid magnam repudiandae iste
          nam sit quod dolor quae voluptates ipsa doloribus accusamus magni,
          labore enim aperiam? In, quos magni! Porro impedit temporibus itaque
          cupiditate? Facilis quam expedita praesentium voluptates, ipsum ab
          officiis voluptatibus illum laborum minus dicta similique eius, non
          nesciunt laboriosam magni error, mollitia et repudiandae aliquam
          tempore necessitatibus voluptatum eveniet sed. Assumenda cumque animi
          facere sed voluptas vel, aliquam labore nam! Perferendis officiis,
          totam harum blanditiis incidunt cum. Atque qui ipsum sequi, cupiditate
          itaque nobis consequuntur in neque, dolores quasi ipsam eius, tempore
          rerum libero aperiam voluptate assumenda laboriosam aspernatur facilis
          deserunt architecto quos. Sint veritatis tenetur facere earum velit
          provident magnam nesciunt eos quae blanditiis dolore dolor, veniam
          sapiente, voluptas sequi adipisci quisquam consequatur odit, eveniet
          cumque. Non a at similique nobis suscipit! Tempora repellendus iusto
        </p>
        <hr />
      </Col>
    </Row>
  );
};

export default ThreadContent;
