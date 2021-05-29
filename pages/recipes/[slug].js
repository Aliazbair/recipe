import Image from 'next/image'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Skeleton from '../../components/Skeleton'
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

// create getStaticPaths function
export async function getStaticPaths() {
  // make response
  const res = await client.getEntries({ content_type: 'recipe' })
  // create path
  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    }
  })

  return {
    paths,
    fallback: true,
  }
}

// create the getstaticprops function
export async function getStaticProps({ params }) {
  // get items
  const { items } = await client.getEntries({
    content_type: 'recipe',
    'fields.slug': params.slug,
  })
  return {
    props: {
      recipe: items[0],
      revalidate: 1,
    },
  }
}
export default function RecipeDetails({ recipe }) {

  // check the recipe 
  if(!recipe)return <div><Skeleton/>
  </div>
  const { featuredImage, title, cookingTime, ingerdients, method } =
    recipe.fields
  return (
    <div>
      <div className='banner'>
        <Image
          src={`https:${featuredImage.fields.file.url}`}
          width={featuredImage.fields.file.details.image.width}
          height={featuredImage.fields.file.details.image.height}
        />
        <h2>{title}</h2>
      </div>
      {/* info */}
      <div className='info'>
        <p>Takes about {cookingTime} mins to cook.</p>
        <h3>Ingreients</h3>
        {ingerdients.map((ing) => (
          <span key={ing}>{ing}</span>
        ))}
      </div>
      

      {/* method */}
      <div className='method'>
        <h3>Method</h3>
        <div>{documentToReactComponents(method)}</div>
      </div>

      {/* styels */}
      <style jsx>{`
        h2,
        h3 {
          text-transform: uppercase;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -60px;
          left: -10px;
          transfrom: rotaateZ(-10deg);
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
        }
        .info p {
          margin: 0;
        }
        .info span::after {
          conent: ',';
        }
        .info span::last-child::after {
          conent: '.';
        }
      `}</style>
    </div>
  )
}
