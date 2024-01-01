from entity.achivments import Achivments
import uuid


def get_list_of_achiv(profile_id:int):
    return [generate_first_bet(profile_id),
            generate_first_win(profile_id),
            generate_first_lose(profile_id),
            generate_przegryw(profile_id),
            generate_hat_trick(profile_id),
            generate_25_bet(profile_id),
            generate_50_bet(profile_id),
            generate_100_bet(profile_id),
            generate_1000_bet(profile_id),
            generate_25_ratings(profile_id),
            generate_50_ratings(profile_id)]


def generate_przegryw(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='ba9d3747-3065-4562-b5d7-838c3a218529',
        achiv_name='Przegryw',
        profile_id=profile_id,
        description='Szukaj szczęścia w czymś innym',
        image_url='',
        query_text=f"""WITH ranked_bets AS (
    SELECT *,
           s.full_time != CONCAT(bets.home_team::varchar, '-', bets.away_team::varchar) AS winnerr,
           LAG((s.full_time != CONCAT(bets.home_team::varchar, '-', bets.away_team::varchar))::int, 1) OVER (ORDER BY bets.id) AS prev_winner1,
           LAG((s.full_time != CONCAT(bets.home_team::varchar, '-', bets.away_team::varchar))::int, 2) OVER (ORDER BY bets.id) AS prev_winner2,
           LAG((s.full_time != CONCAT(bets.home_team::varchar, '-', bets.away_team::varchar))::int, 2) OVER (ORDER BY bets.id) AS prev_winner3,
           LAG((s.full_time != CONCAT(bets.home_team::varchar, '-', bets.away_team::varchar))::int, 2) OVER (ORDER BY bets.id) AS prev_winner4,
           LAG((s.full_time != CONCAT(bets.home_team::varchar, '-', bets.away_team::varchar))::int, 2) OVER (ORDER BY bets.id) AS prev_winner5,
           LAG((s.full_time != CONCAT(bets.home_team::varchar, '-', bets.away_team::varchar))::int, 2) OVER (ORDER BY bets.id) AS prev_winner6,
           LAG((s.full_time != CONCAT(bets.home_team::varchar, '-', bets.away_team::varchar))::int, 2) OVER (ORDER BY bets.id) AS prev_winner7,
           LAG((s.full_time != CONCAT(bets.home_team::varchar, '-', bets.away_team::varchar))::int, 2) OVER (ORDER BY bets.id) AS prev_winner8,
           LAG((s.full_time != CONCAT(bets.home_team::varchar, '-', bets.away_team::varchar))::int, 2) OVER (ORDER BY bets.id) AS prev_winner9
    FROM bets
    JOIN match m ON m.id = bets.match_id
    JOIN score s ON m.score_id = s.id
    WHERE profile_id = {profile_id}
      AND m.status = 'FINISHED'
    ORDER BY bets.id
)

SELECT CASE
           WHEN EXISTS (
               SELECT 1
               FROM ranked_bets
               WHERE winnerr
                 AND prev_winner1 = 1
                 AND prev_winner2 = 1
                 AND prev_winner3 = 1
                 AND prev_winner4 = 1
                 AND prev_winner5 = 1
                 AND prev_winner6 = 1
                 AND prev_winner7 = 1
                 AND prev_winner8 = 1
                 AND prev_winner9 = 1
           ) THEN TRUE
           ELSE FALSE
       END AS result;""")

def generate_first_bet(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='5009cc0c-1742-4402-a846-f227491ec978',
        achiv_name='Dobre złego początki',
        profile_id=profile_id,
        description='Utwórz swój pierwszy bet',
        image_url='',
        query_text=f"""Select count(id) >= 1 as result from bets where profile_id = {profile_id} offset 0 limit 1""")

def generate_first_win(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='a19f0ced-804d-46b5-ad4e-76de978f42bc',
        achiv_name='Veni, vidi, vici',
        profile_id=profile_id,
        description='Dobrze obstaw swój pierwszy bet',
        image_url='',
        query_text=f"""Select count(bets.id) >= 1 as result from bets
                        join match m on m.id = bets.match_id
                        join score s on m.score_id = s.id
                        where profile_id = {profile_id} and m.status = 'FINISHED' and s.full_time = CONCAT(bets.home_team::varchar, '-', bets.away_team::varchar) offset 0 limit 1""")

def generate_first_lose(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='fb7a3215-cebb-4ba1-a83f-cdf7b6976478',
        achiv_name='DLACZEGO!?',
        profile_id=profile_id,
        description='Źle obstaw swój pierwszy mecz',
        image_url='',
        query_text=f"""Select count(bets.id) >= 1 as result from bets
                        join match m on m.id = bets.match_id
                        join score s on m.score_id = s.id
                        where profile_id = {profile_id} and m.status = 'FINISHED' and s.full_time != CONCAT(bets.home_team::varchar, '-', bets.away_team::varchar) offset 0 limit 1""")

def generate_hat_trick(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='4776a65b-bb8f-4721-a98e-5ed9ced8d275',
        achiv_name='Hat Trick',
        profile_id=profile_id,
        description='Traf 3 pełne wyniki meczu z rzędu',
        image_url='',
        query_text=f"""WITH ranked_bets AS (
                            SELECT *,
                                s.full_time = CONCAT(bets.home_team::varchar, '-', bets.away_team::varchar) AS winnerr,
                                LAG((s.full_time = CONCAT(bets.home_team::varchar, '-', bets.away_team::varchar))::int, 1) OVER (ORDER BY bets.id) AS prev_winner,
                                LAG((s.full_time = CONCAT(bets.home_team::varchar, '-', bets.away_team::varchar))::int, 2) OVER (ORDER BY bets.id) AS prev_prev_winner
                            FROM bets
                            JOIN match m ON m.id = bets.match_id
                            JOIN score s ON m.score_id = s.id
                            WHERE profile_id = {profile_id}
                            AND m.status = 'FINISHED'
                            ORDER BY bets.id
                        )

                        SELECT CASE
                                WHEN EXISTS (
                                    SELECT 1
                                    FROM ranked_bets
                                    WHERE winnerr
                                        AND prev_winner = 1
                                        AND prev_prev_winner = 1
                                ) THEN TRUE
                                ELSE FALSE
                            END AS result;
                        """)

def generate_25_bet(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='c290ea7a-1b7c-473c-8c8b-f211f5f35f13',
        achiv_name='Początek nałogu',
        profile_id=profile_id,
        description='Utwórz 25 betów',
        image_url='',
        query_text=f"""SELECT count(id) > 25 as result from bets where profile_id = {profile_id}""")

def generate_50_bet(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='a56165e0-fca0-43f4-a87f-db4ea97816f8',
        achiv_name='50 słusznych decyzji',
        profile_id=profile_id,
        description='Utwórz 50 betów',
        image_url='',
        query_text=f"""SELECT count(id) > 50 as result from bets where profile_id = {profile_id}""")

def generate_100_bet(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='bb0ac1e5-e332-4831-a581-09e9a7540df5',
        achiv_name='W pełni',
        profile_id=profile_id,
        description='Utwórz 100 betów',
        image_url='',
        query_text=f"""SELECT count(id) > 100 as result from bets where profile_id = {profile_id}""")

def generate_1000_bet(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='a1902fab-f273-4b1e-91d4-402680269b1e',
        achiv_name='Pierwszy tysiąc trzeba ukraść',
        profile_id=profile_id,
        description='Utwórz 1000 betów',
        image_url='',
        query_text=f"""SELECT count(id) > 1000 as result from bets where profile_id = {profile_id}""")

def generate_25_ratings(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='770c1587-8c46-48ab-ac70-1de695b3b0a3',
        achiv_name='Poproszę ćwiartkę',
        profile_id=profile_id,
        description='Osiągnij 25% skuteczności betów',
        image_url='',
        query_text=f"""select r.rating >= 25 as result from profiles join ratings r on profiles.rating_id = r.id where profiles.id = {profile_id}""")

def generate_50_ratings(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='d87bb683-37d1-4295-b18d-4c15a37ac501',
        achiv_name='50/50',
        profile_id=profile_id,
        description='Osiągnij 50% skuteczności betów',
        image_url='',
        query_text=f"""select r.rating >= 50 as result from profiles join ratings r on profiles.rating_id = r.id where profiles.id = {profile_id}""")