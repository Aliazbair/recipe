import Link from 'next/link'
import Image from 'next/image'

const RecipeCard = ({ recipe }) => {
  const { title, slug, cookingTime, thumbnail } = recipe.fields
  return (
    <div className='card'>
      <div className='featured'>
        {/* image - thumbali */}
        <Image
          src={`https:${thumbnail.fields.file.url}`}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
        />
      </div>
      {/* content */}
      <div className='content'>
        {/* info */}
        <div className='info'>
          <h4>{title}</h4>
          <p> Takes approx {cookingTime} min to mak</p>
        </div>
        {/* action */}
        <div className='action'>
          <Link href={`/recipes/${slug}`}>
            <a>Cook this</a>
          </Link>
        </div>
      </div>

      {/* style   */}
      <style jsx>{`
        .card {
          transform: rotateZ(-1deg);
        }
        .content {
          background: #fff;
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
          margin: 0;
          position: relative;
          top: -40px;
          left: -10px;
        }
        .info {
          padding: 16px;
        }
        .info h4 {
          margin: 4px 0;
          text-transform: uppercase;
        }
        .info p {
          margin: 0;
          color: #777;
        }
        .action {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
        }
        .action a {
          color: #fff;
          background: #f01b29;
          padding: 16px 24px;
          text-decoration: none;
        }
      `}</style>
    </div>
  )
}

export default RecipeCard
