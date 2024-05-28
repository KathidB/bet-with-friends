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
            generate_250_bet(profile_id),
            generate_500_bet(profile_id),
            generate_1000_bet(profile_id),
            generate_1500_bet(profile_id),
            generate_2000_bet(profile_id),
            generate_25_ratings(profile_id),
            generate_50_ratings(profile_id),
            generate_5_bets_correct(profile_id),
            generate_25_bets_correct(profile_id),
            generate_100_bets_correct(profile_id),
            generate_250_bets_correct(profile_id),
            generate_500_bets_correct(profile_id),
            generate_1000_bets_correct(profile_id)]


def generate_przegryw(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='ba9d3747-3065-4562-b5d7-838c3a218529',
        achiv_name='Bad luck',
        profile_id=profile_id,
        description='Find luck in something else',
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
        achiv_name='Hello world',
        profile_id=profile_id,
        description='Create your first bet.',
        image_url='',
        query_text=f"""Select count(id) >= 1 as result from bets where profile_id = {profile_id} offset 0 limit 1""")

def generate_first_win(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='a19f0ced-804d-46b5-ad4e-76de978f42bc',
        achiv_name='Veni, vidi, vici',
        profile_id=profile_id,
        description='Make a good prediction on your first match.',
        image_url='',
        query_text=f"""Select count(bets.id) >= 1 as result from bets
                        join match m on m.id = bets.match_id
                        join score s on m.score_id = s.id
                        where profile_id = {profile_id} and m.status = 'FINISHED' and s.full_time = CONCAT(bets.home_team::varchar, '-', bets.away_team::varchar) offset 0 limit 1""")

def generate_first_lose(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='fb7a3215-cebb-4ba1-a83f-cdf7b6976478',
        achiv_name='WHY!?',
        profile_id=profile_id,
        description='Make a wrong prediction on your first match.',
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
        description='Successfully predict three consecutive match outcomes.',
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
        achiv_name='The beginning of an addiction',
        profile_id=profile_id,
        description='Create 25 bets.',
        image_url='',
        query_text=f"""SELECT count(id) > 25 as result from bets where profile_id = {profile_id}""")

def generate_50_bet(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='a56165e0-fca0-43f4-a87f-db4ea97816f8',
        achiv_name='50 right decisions.',
        profile_id=profile_id,
        description='Create 50 bets',
        image_url='',
        query_text=f"""SELECT count(id) > 50 as result from bets where profile_id = {profile_id}""")

def generate_100_bet(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='bb0ac1e5-e332-4831-a581-09e9a7540df5',
        achiv_name='Experienced player.',
        profile_id=profile_id,
        description='Create 100 bets',
        image_url='',
        query_text=f"""SELECT count(id) > 100 as result from bets where profile_id = {profile_id}""")

def generate_250_bet(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='e63c0991-1dc6-4efb-8c6c-b4b00c6e3df8',
        achiv_name='Not wasting time',
        profile_id=profile_id,
        description='Create 250 bets.',
        image_url='',
        query_text=f"""SELECT count(id) > 250 as result from bets where profile_id = {profile_id}""")

def generate_500_bet(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='8319de45-20a5-4f40-b60e-c2e96a1aaeda',
        achiv_name='More!',
        profile_id=profile_id,
        description='Create 500 bets',
        image_url='',
        query_text=f"""SELECT count(id) > 500 as result from bets where profile_id = {profile_id}""")

def generate_1000_bet(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='a1902fab-f273-4b1e-91d4-402680269b1e',
        achiv_name='First thousand',
        profile_id=profile_id,
        description='Create 1000 bets.',
        image_url='',
        query_text=f"""SELECT count(id) > 1000 as result from bets where profile_id = {profile_id}""")

def generate_1500_bet(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='69cc046d-633f-4de9-a49e-464b7b8d740a',
        achiv_name='Thats a lot of bets',
        profile_id=profile_id,
        description='Create 1500 bets.',
        image_url='',
        query_text=f"""SELECT count(id) > 1500 as result from bets where profile_id = {profile_id}""")

def generate_2000_bet(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='f7d37a1a-286b-4fd7-814d-8fa0ef2c4444',
        achiv_name='Master of bets',
        profile_id=profile_id,
        description='Create 2000 bets',
        image_url='',
        query_text=f"""SELECT count(id) > 2000 as result from bets where profile_id = {profile_id}""")

def generate_25_ratings(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='770c1587-8c46-48ab-ac70-1de695b3b0a3',
        achiv_name='Quarter, please.',
        profile_id=profile_id,
        description='Achieve a 25% success rate in bets',
        image_url='',
        query_text=f"""select r.rating >= 25 as result from profiles join ratings r on profiles.rating_id = r.id where profiles.id = {profile_id}""")

def generate_50_ratings(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='01190eea-4998-48dc-8c4d-99e1dd9f552c',
        achiv_name='50/50',
        profile_id=profile_id,
        description='Achieve a 50% success rate in bets',
        image_url='',
        query_text=f"""select r.rating >= 50 as result from profiles join ratings r on profiles.rating_id = r.id where profiles.id = {profile_id}""")


def generate_5_bets_correct(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='955809cc-68b0-4fde-b0b8-0ceb849a390e',
        achiv_name='Lucky 5',
        profile_id=profile_id,
        description='Correctly predict the outcome of 5 matches.',
        image_url='',
        query_text=f"""select count(bets.id) >= 5 from bets join match m on m.id = bets.match_id join score s on s.id = m.score_id where s.full_time = concat(bets.home_team,'-',bets.away_team) and bets.profile_id = {profile_id}""")

def generate_25_bets_correct(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='e7bdc55c-0aa7-47b1-a7ad-fccfd33589e0',
        achiv_name='5x5',
        profile_id=profile_id,
        description='Correctly predict the outcome of 25 matches.',
        image_url='',
        query_text=f"""select count(bets.id) >= 25 from bets join match m on m.id = bets.match_id join score s on s.id = m.score_id where s.full_time = concat(bets.home_team,'-',bets.away_team) and bets.profile_id = {profile_id}""")

def generate_100_bets_correct(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='141e4aba-54d0-410e-b059-65f9f9e6c20f',
        achiv_name="It's not a coincidence.",
        profile_id=profile_id,
        description='Correctly predict the outcome of 100 matches.',
        image_url='',
        query_text=f"""select count(bets.id) >= 100 from bets join match m on m.id = bets.match_id join score s on s.id = m.score_id where s.full_time = concat(bets.home_team,'-',bets.away_team) and bets.profile_id = {profile_id}""")

def generate_250_bets_correct(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='62261fde-2bc2-46ac-af56-c82a824b066f',
        achiv_name='Mastermind',
        profile_id=profile_id,
        description='Correctly predict the outcome of 250 matches',
        image_url='',
        query_text=f"""select count(bets.id) >= 250 from bets join match m on m.id = bets.match_id join score s on s.id = m.score_id where s.full_time = concat(bets.home_team,'-',bets.away_team) and bets.profile_id = {profile_id}""")

def generate_500_bets_correct(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='e15b0a9a-2eef-40c2-9b0e-a0662eda63c3',
        achiv_name='Guardiola',
        profile_id=profile_id,
        description='Correctly predict the outcome of 500 matches',
        image_url='',
        query_text=f"""select count(bets.id) >= 500 from bets join match m on m.id = bets.match_id join score s on s.id = m.score_id where s.full_time = concat(bets.home_team,'-',bets.away_team) and bets.profile_id = {profile_id}""")

def generate_1000_bets_correct(profile_id:int) -> Achivments:
    return Achivments(
        uuid=uuid.uuid4(),
        achivment_type_uuid='5cbf8038-9dc8-40a3-bb7c-fc062b0bcc8c',
        achiv_name='Legend',
        profile_id=profile_id,
        description='Correctly predict the outcome of 1000 matches',
        image_url='',
        query_text=f"""select count(bets.id) >= 1000 from bets join match m on m.id = bets.match_id join score s on s.id = m.score_id where s.full_time = concat(bets.home_team,'-',bets.away_team) and bets.profile_id = {profile_id}""")