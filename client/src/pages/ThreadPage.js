import React from 'react';
import { PageHeader, Menu, Dropdown, Button, Tag, Typography, Row } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Paragraph } = Typography;

function ThreadPage() {
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='http://www.alipay.com/'
        >
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='http://www.taobao.com/'
        >
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='http://www.tmall.com/'
        >
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  );

  const DropdownMenu = () => (
    <Dropdown key='more' overlay={menu} placement='bottomRight'>
      <Button type='text' icon={<MoreOutlined style={{ fontSize: 20 }} />} />
    </Dropdown>
  );

  const routes = [
    {
      path: '',
      breadcrumbName: 'Home',
    },
    {
      path: 'categories',
      breadcrumbName: 'Categories',
    },
    {
      path: 'thread',
      breadcrumbName: 'Thread',
    },
  ];

  const IconLink = ({ src, text }) => (
    <a className='example-link'>
      <img className='example-link-icon' src={src} alt={text} />
      {text}
    </a>
  );

  const content = (
    <>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae neque
        reprehenderit repudiandae possimus vel dolor, ullam iste repellat, quia
        libero itaque a quis deleniti praesentium nobis fuga minus impedit sunt!
        Maxime quas, ea laboriosam nisi voluptatibus, distinctio sapiente magnam
        dolore esse enim, animi eos consequuntur nemo. Asperiores odit culpa
        saepe beatae explicabo alias obcaecati quo voluptatem adipisci tenetur
        repellat neque laudantium inventore sunt, reiciendis error pariatur
        illum quis praesentium nam. Eligendi explicabo facere cumque eius
        consequuntur atque commodi minima voluptate vitae ea distinctio ullam
        nihil dicta at incidunt reiciendis eveniet, id dolor ad asperiores unde!
        Labore veniam natus atque sint, nesciunt velit vitae hic voluptas in
        amet quaerat inventore qui rerum, accusamus, voluptatem alias ipsam!
        Nostrum, perferendis consectetur pariatur minus dicta culpa hic quaerat
        aliquid magnam repudiandae iste nam sit quod dolor quae voluptates ipsa
        doloribus accusamus magni, labore enim aperiam? In, quos magni! Porro
        impedit temporibus itaque cupiditate? Facilis quam expedita praesentium
        voluptates, ipsum ab officiis voluptatibus illum laborum minus dicta
        similique eius, non nesciunt laboriosam magni error, mollitia et
        repudiandae aliquam tempore necessitatibus voluptatum eveniet sed.
        Assumenda cumque animi facere sed voluptas vel, aliquam labore nam!
        Perferendis officiis, totam harum blanditiis incidunt cum. Atque qui
        ipsum sequi, cupiditate itaque nobis consequuntur in neque, dolores
        quasi ipsam eius, tempore rerum libero aperiam voluptate assumenda
        laboriosam aspernatur facilis deserunt architecto quos. Sint veritatis
        tenetur facere earum velit provident magnam nesciunt eos quae blanditiis
        dolore dolor, veniam sapiente, voluptas sequi adipisci quisquam
        consequatur odit, eveniet cumque. Non a at similique nobis suscipit!
        Tempora repellendus iusto animi, enim, magni eius quas nihil dolorem
        praesentium tenetur similique qui excepturi optio unde ipsam, provident
        id laudantium ab. Tenetur odio nihil ad architecto earum temporibus est
        ut? Iste, quam totam. Vitae amet provident, aspernatur dolorum eos
        obcaecati magnam harum molestias cupiditate asperiores ipsam blanditiis
        quisquam. Porro voluptates fuga sit culpa similique cupiditate iure
        cumque enim at! Laudantium ut nobis, quam totam commodi reprehenderit,
        velit repudiandae eius sed, ducimus quasi blanditiis dolorum odit soluta
        at similique fuga! Dignissimos exercitationem beatae hic ipsum
        architecto ex officia in. Consequatur nemo voluptatibus tempore totam
        sit recusandae animi beatae natus, laboriosam necessitatibus ad
        perspiciatis reprehenderit tenetur quo placeat aspernatur voluptates
        nostrum? Tempore reiciendis dolorum consequatur quis labore excepturi
        maiores ad alias inventore sint dolores odio iusto earum sunt iste ipsa
        doloremque fugit accusamus, quod modi quae. Blanditiis numquam animi
        nostrum deserunt adipisci ea, quaerat, magnam placeat velit corporis
        error iure voluptate porro enim, nam architecto optio cumque? Eum,
        sequi? Hic optio, id, cum architecto ipsam perspiciatis provident
        voluptas dolorum omnis maiores corrupti commodi fugiat officiis delectus
        dolor excepturi minus quod dolores. Odio, blanditiis illo consequatur
        vitae temporibus exercitationem nesciunt provident libero possimus earum
        doloremque est iusto molestiae architecto praesentium cum voluptatem
        iure accusantium nihil. Adipisci repellat laborum, quis odit doloremque
        quisquam quasi quaerat ab reprehenderit hic, error pariatur velit non a
        nisi consequatur rerum voluptatibus aliquam earum placeat quam deserunt.
        Earum unde nulla nihil qui ad debitis aperiam expedita aut voluptas
        dignissimos aliquid, itaque at consectetur animi repellat aspernatur
        illo!
      </p>
    </>
  );

  const Content = ({ children, extraContent }) => (
    <Row>
      <div>{children}</div>
      <div className='image'>{extraContent}</div>
    </Row>
  );
  return (
    <PageHeader
      title='This is ther thread title this should be long and handsome'
      className='site-page-header'
      subTitle=''
      tags={<Tag color='blue'>Running</Tag>}
      extra={
        [
          // <Button key='3'>Operation</Button>,
          // <Button key='2'>Operation</Button>,
          // <Button key='1' type='primary'>
          //   Primary
          // </Button>,
          // <DropdownMenu key='more' />,
        ]
      }
      avatar={{
        src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
      }}
      breadcrumb={{
        routes,
        itemRender: function itemRender(route, params, routes, paths) {
          console.log(paths);
          const last = routes.indexOf(route) === routes.length - 1;
          return last ? (
            <span>{route.breadcrumbName}</span>
          ) : (
            <Link to={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>
          );
        },
      }}
    >
      <Content
        extraContent={
          <img
            src='https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg'
            alt='content'
            width='100%'
          />
        }
      >
        {content}
      </Content>
    </PageHeader>
  );
}

export default ThreadPage;
