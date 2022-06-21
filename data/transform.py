import geopandas as gpd
import pandas as pd

geo_df = gpd.read_file('data/countries.geojson')
df = pd.read_csv('data/democracy_index_2021.csv')

new_df = df.merge(geo_df, left_on='name', right_on='ADMIN')[['name', 'year', 'rank', 'value', 'geometry']]

new_df = gpd.GeoDataFrame(new_df)

new_df.to_file('data/merged_countries.geojson', driver='GeoJSON')
